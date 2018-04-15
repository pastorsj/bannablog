import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { AuthenticationService } from 'app/_services/authentication.service';
import { AuthorService } from 'app/_services/author.service';
import { environment } from 'environments/environment';

import { LoginModalComponent } from 'app/login-modal/login-modal.component';
import { RegisterModalComponent } from 'app/register-modal/register-modal.component';
import { SettingsModalComponent } from 'app/article-portal/settings-modal/settings-modal.component';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

    private destroyed: Subject<boolean> = new Subject<boolean>();

    public title = `The Lighthouse`;
    public name: Promise<string>;
    public image: Promise<string>;

    constructor(private auth: AuthenticationService,
        private authorService: AuthorService,
        private router: Router,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.auth.checkJwtExpiration()
            .then(() => {
                this.name = this.authorService.getAuthorName();
                this.image = this.authorService.getProfilePicture();
            })
            .catch(() => {
                this.logout();
            });
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }

    login() {
        this.dialog.open(LoginModalComponent)
            .afterClosed()
            .takeUntil(this.destroyed)
            .subscribe(result => {
                if (result) {
                    this.name = this.authorService.getAuthorName();
                    this.image = this.authorService.getProfilePicture();
                }
            });
    }

    register() {
        this.dialog.open(RegisterModalComponent)
            .afterClosed()
            .takeUntil(this.destroyed)
            .subscribe(name => {
                if (name) {
                    this.name = Promise.resolve(name);
                    this.image = Promise.resolve(environment.DEFAULT_PROFILE_PICTURE);
                }
            });
    }

    editSettings() {
        this.dialog.open(SettingsModalComponent)
            .afterClosed()
            .takeUntil(this.destroyed)
            .subscribe(result => {
                if (result && result.name) {
                    this.name = Promise.resolve(result.name);
                }
                if (result && result.image) {
                    this.image = Promise.resolve(result.image);
                }
            });
    }

    loggedIn() {
        return this.auth.isAuthenticated();
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
    }

}
