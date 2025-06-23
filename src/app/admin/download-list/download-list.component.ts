import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-download-list',
  standalone: false,
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent {
allDownloads:any=[]
constructor(private api:ApiService){}
ngOnInit(){
  this.getAllDownload()
}
getAllDownload(){
  this.api.getAllDownloadsApi().subscribe((res)=>{
    console.log('All downloads:')
    console.log(res)
    this.allDownloads=res
  })
}
}
