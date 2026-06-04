import { Routes } from '@angular/router';
import { Home } from '../Features/home/home';
import { MemberList } from '../Features/members/member-list/member-list';
import { MemberDetails } from '../Features/members/member-details/member-details';
import { Lists } from '../Features/lists/lists';
import { Messages } from '../Features/messages/messages';
import { authGuard } from '../Core/guards/auth-guard';
import { TestErrors } from '../Features/test-errors/test-errors';
import { NotFound } from '../Shared/errors/not-found/not-found';
import { Component } from '@angular/core';
import { MemberProfile } from '../Features/members/member-profile/member-profile';
import { MemberPhotos } from '../Features/members/member-photos/member-photos';
import { MemberMessages } from '../Features/members/member-messages/member-messages';
import { memberResolver } from '../Features/members/member-resolver';
import { preventUnsavedChangesGuard } from '../Core/guards/prevent-unsaved-changes-guard';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberList },
            {
                path: 'members/:id', component: MemberDetails,
                resolve: { member: memberResolver },
                runGuardsAndResolvers: 'always',
                children: [
                    {
                        path: '', redirectTo: 'profile', pathMatch: 'full'
                    },
                    {
                        path: 'profile', component: MemberProfile, title: 'Profile',canDeactivate:[preventUnsavedChangesGuard]
                    },
                    {
                        path: 'photos', component: MemberPhotos, title: 'Photos'
                    },
                    {
                        path: 'messages', component: MemberMessages, title: 'Messages'
                    }
                ]
            },
            { path: 'lists', component: Lists },
            { path: 'messages', component: Messages },
        ]
    },
    { path: "errors", component: TestErrors },
    { path: '**', component: NotFound, pathMatch: 'full' },

];