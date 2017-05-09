import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

declare var dashjs;

@Component({
    selector: 'dash-player',
    template: '<div #videoContainer><video #videoPlayer controls></video></div>',
    styles: ['.video-container,video { width:100%; }']
})
export class DashPlayerComponent implements OnInit {
    @ViewChild('videoPlayer') video: ElementRef;
    @ViewChild('videoContainer') container: ElementRef;

    @Input() url;

    player: any;

    ngOnInit() {
        this.player = dashjs.MediaPlayer().create();
        this.player.initialize(this.video.nativeElement, null, true);
        this.player.setFastSwitchEnabled(true);
        this.player.attachVideoContainer(this.container.nativeElement);
        if (this.url) {
            this.player.attachSource(this.url);
        }
    }

    ngOnChanges() {
        if (this.url && this.player) {
            this.player.attachSource(this.url);
        }
    }

}
