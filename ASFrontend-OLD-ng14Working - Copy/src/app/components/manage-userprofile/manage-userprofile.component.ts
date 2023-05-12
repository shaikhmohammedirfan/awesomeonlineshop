import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-userprofile',
  templateUrl: './manage-userprofile.component.html',
  styleUrls: ['./manage-userprofile.component.scss'],
})
export class ManageUserprofileComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  closeForm(): void {
    this.router.navigate(['/'], { relativeTo: this.route });
  }
}
