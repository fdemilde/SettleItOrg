import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

var styles = [require('./blog.component.css')];
var routs = [];
var declarations = [];
var component;

@Component({ template: require('./blog.component.html'), styles: styles })
export class BlogComponent { }
routs.push({ path: 'blog', component: BlogComponent });
declarations.push(BlogComponent);

@Component({ template: require('./posts/experiment1.html'), styles: styles })
export class Experiment1 { }
routs.push({ path: 'blog/I-Failed-to-Save-the-World---Experiment-1', component: Experiment1 })
declarations.push(Experiment1);

@Component({ template: require('./posts/lessons1.html'), styles: styles })
export class lessons1 { }
routs.push({ path: 'blog/Lessons-Learned-From-the-First-Experiment-to-Settle-It', component: lessons1 })
declarations.push(lessons1);

@Component({ template: require('./posts/ignoredposts.html'), styles: styles })
export class ignoredposts { }
routs.push({ path: 'blog/4-Unspoken-Reasons-Why-they-Ignore-Your-Posts', component: ignoredposts })
declarations.push(ignoredposts);

// @Component({ template: require('./posts/**postName**.html'), styles: styles })
// export class **postName** { }
// routs.push({ path: '**postUrl**', component: **postName** })
// declarations.push(**postName**);

@NgModule({
  imports: [RouterModule.forChild(routs)],
  declarations: declarations,
  exports: [RouterModule]
})
export class BlogRoutingModule { }


