import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import 'hammerjs';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {Router} from './app.routing';
import { SideNavComponent } from './side-nav/side-nav.component';
import { EditorComponent } from './editor/editor.component';
import { UserArticlesComponent } from './user-articles/user-articles.component';
import { CreateArticleModalComponent } from './create-article-modal/create-article-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    SideNavComponent,
    EditorComponent,
    UserArticlesComponent,
    CreateArticleModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    Router,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  entryComponents: [
    CreateArticleModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
