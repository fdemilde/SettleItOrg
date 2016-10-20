interface Statement {
    /** a base62 GUID string to identify each statement */
    id?: string;

    /** The ID of the parent statement in this graph */
    parentId?: string;

    /** The text of the statement with the claim. May include markdown in the future. */
    content?: string;

    /** very short unique text for displaying of charts and other areas with limited space. */
    label?: string;

    /** Does this statement support the main top statement in this graph (true) or disput it (false) */
    isProMain?: boolean;

    /** Does this statement support it's parent statement in this graph (true) or disput it (false) */
    isProParent?: boolean;

    /** Does this statement affect the confidence or the importance of it's parent */
    affects?: Affects;

    /**  */
    confidence?: Confidence;

    /**  */
    importance?: Importance;

    /**  */
    siblingWeight?: number;

    /**  */
    weighted?: Weighted;

    /**  */
    children?: Statement[];

    /**  */
    maxAncestorWeight?: number;

    /**  */
    mainPercent?: number;

    /** */
    weightedPercentage?: number;

    /** */
    generation?: number;

    open?: boolean;
}

interface Confidence {
    pro?: number;
    con?: number;
}

interface Importance {
    pro?: number;
    con?: number;
    value?: number;
}

interface Weighted {
    pro?: number;
    con?: number;
    difference?: number;
    differenceText?: string
}

type Affects = "AverageTheConfidence" | "MaximumOfConfidence" | "Importance";

