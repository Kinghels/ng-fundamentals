import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SessionListComponent } from './session-list.component';
import { DebugElement } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from './voter.service';
import { UpvoteComponent } from './upvote/upvote.component';
import { DurationPipe } from '../shared';
import { CollapsibleWellComponent } from 'src/app/common';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>,
     component: SessionListComponent,
     element: HTMLElement,
     debugEl: DebugElement;

    beforeEach(async(() => {
        const mockAuthService = {
            isAuthenticated: () =>  true
        };
        const mockVoter = {
            userHAsVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                // UpvoteComponent,
                DurationPipe,
                // CollapsibleWellComponent
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: VoterService, useValue: mockVoter }
            ],
            schemas: [
                // Evita errores de componentes que no estan siendo referenciados
                NO_ERRORS_SCHEMA
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('initialDesplay', () => {
        it('should have the correct session title', () => {
            component.sessions = [{ id: 3, name: 'Session 1', presenter: 'Joe', duration: 1, level: 'beginner',
            abstract: 'abstract', voters: ['john', 'bob'] }];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;

            component.ngOnChanges();
            // renderiza html
            fixture.detectChanges();

            expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
        });
    });
});
