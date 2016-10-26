
import { Injectable } from '@angular/core';

@Injectable()
export class SettleIt {

    //The variable s always means statement
    public mainStatment: Statement;
    public shouldSort: boolean;

    constructor() { }

    public calculate(mainStatement?: Statement, shouldSort?: boolean) {
        if (mainStatement != undefined) this.mainStatment = mainStatement;
        if (shouldSort !== undefined) this.shouldSort = shouldSort;

        this.step1ValidateStatements(this.mainStatment);
        this.step2AscendStatements(this.mainStatment);
        this.step3DescendStatements(this.mainStatment);
        this.step4AscendStatements(this.mainStatment);
    }

    public step1ValidateStatements(s: Statement, parent?: Statement) {
        if (s.children == undefined) s.children = [];
        if (s.confidence == undefined) s.confidence = {};
        if (s.importance == undefined) s.importance = {};
        if (s.weighted == undefined) s.weighted = {};

        //todo make this a 62bit GUID [a-z,A-Z,0-9]
        if (s.id == undefined) s.id = ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);

        this.calculateProMainParent(s, parent);

        this.calculateGeneration(s, parent);
        for (let child of s.children) {
            this.step1ValidateStatements(child, s);
        }
    }

    private calculateGeneration(s: Statement, parent?: Statement) {
        if (s.generation == undefined)
            s.generation = 0;

        if (parent)
            s.generation = parent.generation + 1;
    }

    private calculateProMainParent(s: Statement, parent?: Statement) {
        var parentIsProMain = true;
        if (parent && parent.isProMain !== undefined)
            parentIsProMain = parent.isProMain;



        //If neither exist then default to proMain
        if (s.isProMain === undefined && s.isProParent === undefined) {
            s.isProMain = true;
            s.isProParent = s.isProMain == parentIsProMain;
        }

        //if both exist then assume isProMain is correct
        if (s.isProMain !== undefined && s.isProParent !== undefined) {
            s.isProParent = s.isProMain == parentIsProMain;
        }

        //if only isProMain exists then set isProParent
        if (s.isProMain !== undefined && s.isProParent === undefined) {
            s.isProParent = s.isProMain == parentIsProMain;
        }

        //if only isProParent exists then set isProMain
        if (s.isProMain === undefined && s.isProParent !== undefined) {
            if (s.isProParent)
                s.isProMain = parentIsProMain;
            else
                s.isProMain = !parentIsProMain;
        }

    }


    private step2AscendStatements(s: Statement, parent?: Statement) {
        for (let child of s.children) {
            this.step2AscendStatements(child, s);
        }
        if (s.children === undefined) s.children = [];
        if (s.affects == undefined) s.affects = "AverageTheConfidence";

        this.calculateSiblingWeight(s);
        this.calculateConfidence(s);
        this.calculateImportance(s);
    }

    /** Find the sibling with the most weight (so later you can make them all match)
     * max children ( pro + con ) */
    private calculateSiblingWeight(s: Statement) {
        var maxPoints = 0;
        //Figure out what is the highest number of points among all the children
        for (let child of s.children) {
            if (child.affects != "Importance") {
                var childsTotal = child.confidence.pro + child.confidence.con;
                maxPoints = Math.max(childsTotal, maxPoints);
            }
        }

        //Figure out the multiplier so that all the children have the same weight
        for (let child of s.children) {
            if (child.affects != "Importance") {
                var childsTotal = child.confidence.pro + child.confidence.con;
                if (childsTotal == 0)
                    child.siblingWeight = 0;
                else
                    child.siblingWeight = maxPoints / childsTotal;
            }
            //If it not a confidence (is an importance) then default the weight to 1
            if (child.siblingWeight == undefined)
                child.siblingWeight = 1;
        }
        //If I have no parent the my Sibling weight should default to 1
        if (!s.parentId)
            s.siblingWeight = 1;

    }

    private calculateConfidence(s: Statement) {
        var avgConfPro: number = 0;
        var avgConfCon: number = 0;
        var maxConfPro: number = 0;
        var maxConfCon: number = 0;
        var found: boolean = false;
        //Add up all the children points
        for (let child of s.children) {
            if (child.affects == "AverageTheConfidence") {
                found = true;

                avgConfPro += child.confidence.pro * child.importance.value * child.siblingWeight;
                avgConfCon += child.confidence.con * child.importance.value * child.siblingWeight;
            }
            if (child.affects == "MaximumOfConfidence") {
                found = true;
                var tempPro = child.confidence.pro * child.importance.value * child.siblingWeight;
                var tempCon = child.confidence.con * child.importance.value * child.siblingWeight;
                if (tempPro - tempCon > maxConfPro - maxConfCon) {
                    var maxConfPro = tempPro;
                    var maxConfCon = tempCon;
                }
            }
        }

        //Calculate the Pro and Con
        if (found) {
            s.confidence.pro = avgConfPro + maxConfPro;
            s.confidence.con = avgConfCon + maxConfCon;

            //prevents stataments form reversing
            if (s.isProParent && s.confidence.con > s.confidence.pro)
                s.confidence.pro = s.confidence.con
            if (!s.isProParent && s.confidence.pro > s.confidence.con)
                s.confidence.con = s.confidence.pro

        } else { // Set the defaults if no confidence items were found
            if (s.isProMain) {
                s.confidence.pro = 1;
                s.confidence.con = 0;
            } else {
                s.confidence.pro = 0;
                s.confidence.con = 1;
            }
        }
    }

    /** This performs Importance calculations for both Statements that affect Confidence and Importance.
     * Confidence: sum children(importance) 
     * Importance: (s.importance.pro + 1) / (s.importance.con + 1) */
    private calculateImportance(s: Statement) {
        if (s.affects == "Importance") {
            s.importance.pro = s.confidence.pro;
            s.importance.con = s.confidence.con;
        } else {
            var proImportance: number = 0;
            var conImportance: number = 0;
            //Add up all the importance children points
            for (let child of s.children) {
                if (child.affects == "Importance") {
                    proImportance += child.importance.pro;
                    conImportance += child.importance.con;
                }
            }
            s.importance.pro = proImportance;
            s.importance.con = conImportance;
        }
        s.importance.value = this.safeDivide(s.importance.pro + 1, s.importance.con + 1);
    }

    private step3DescendStatements(s: Statement, parent?: Statement) {
        this.calculatemaxAncestorWeight(s, parent);
        s.weighted.pro = s.confidence.pro * s.importance.value * s.maxAncestorWeight;
        s.weighted.con = s.confidence.con * s.importance.value * s.maxAncestorWeight;
        s.weighted.difference = s.weighted.pro - s.weighted.con;
        this.calculateParentWeightedDiferenceText(s);
        this.calculateMainPercent(s, parent);
        for (let child of s.children) {
            this.step3DescendStatements(child, s);
        }
    }

    private step4AscendStatements(s: Statement, parent?: Statement) {
        for (let child of s.children) {
            this.step4AscendStatements(child, s);
        }
        this.calculateWeightedPercentage(s, parent);
        this.sort(s, parent);

    }

    /** Find the maximum sibling weight of all my ancestors
     * max(parent.maxAncestorWeight, s.siblingWeight) */
    private calculatemaxAncestorWeight(s: Statement, parent: Statement) {
        if (parent) {
            s.maxAncestorWeight = Math.max(parent.maxAncestorWeight, s.siblingWeight);
        }
        else {
            s.maxAncestorWeight = 1;
        }
    }

    /** Adds the proper math sign and converts the disDisplay to a string
     * Affects confidence: + or - , importance � or � */
    private calculateParentWeightedDiferenceText(s: Statement) {
        var sign = '';
        var value: number;
        if (s.affects == "Importance") {
            sign = !s.isProParent ? '�' : '�';
            value = this.safeDivide(s.importance.pro + 1, s.importance.con + 1);
            s.weighted.differenceText = sign + Math.round(s.importance.value);
        } else {
            var value = s.weighted.difference
            sign = value < 0 ? '' : '+';
            if (value == 0)
                sign = s.isProMain ? '+' : '-';
        }
        s.weighted.differenceText = sign + Math.round(value * 100) / 100;
    }

    private calculateMainPercent(s: Statement, parent: Statement) {
        if (parent) {
            if (s.affects == "Importance")
                s.mainPercent = parent.mainPercent * (this.safeDivide(s.confidence.pro + s.confidence.con, parent.confidence.pro + parent.confidence.con))
            else
                s.mainPercent = parent.mainPercent * (this.safeDivide(s.weighted.pro + s.weighted.con, parent.weighted.pro + parent.weighted.con))
        } else {
            s.mainPercent = 1;
        }
    }

    private calculateWeightedPercentage(s: Statement, parent: Statement) {
        var WeightedPluses = 0;
        var WeightedMinuses = 0;
        var found = false;
        for (let child of s.children) {
            found = true;
            if (child.weighted.difference > 0)
                WeightedPluses += child.weighted.difference
            else
                WeightedMinuses += child.weighted.difference
        }
        if (found) {
            if (WeightedPluses - WeightedMinuses === 0)
                s.weightedPercentage = 0;
            else
                s.weightedPercentage = WeightedPluses / (WeightedPluses - WeightedMinuses);
        } else s.weightedPercentage = 1;

    }

    private sort(s: Statement, parent: Statement) {
        if (!this.shouldSort) return;
        s.children.sort((a, b) =>
            Math.abs(b.weighted.difference) - Math.abs(a.weighted.difference)
        );
    }

    private safeDivide(numerator: number, denomerator: number): number {
        if (denomerator == 0)// Avoid division by zero
            return 0;
        else
            return numerator / denomerator;
    }

}

