import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../Layout/nav/nav";
import { AccountServices } from '../Core/account-services';
import { Home } from "../Features/home/home";
import { user } from '../types/user';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from '../Core/services/loading-service';



@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private http = inject(HttpClient);
  protected loadingService = inject(LoadingService);
  public readonly title = 'Dating App';
  protected members = signal<user[]>([])



}


