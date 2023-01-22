import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FiredbService } from 'src/app/services/firedb.service';
import {
  Storage,
  ref,
  deleteObject,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  percentage,
  getDownloadURL,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.scss'],
})
export class AddCategoryFormComponent implements OnInit {
  frmAddCategory: FormGroup;
  uploadPercent: Observable<any> | undefined;
  imgfilename: any;

  constructor(
    private fb: FormBuilder,
    private firedb: FiredbService,
    private storage: Storage
  ) {
    this.frmAddCategory = fb.group({
      categorycode: ['', [Validators.required]],
      categoryname: ['', [Validators.required]],
      imageurl: ['', [Validators.required]],
      modifiedby: '',
    });
  }

  ngOnInit(): void {}

  async uploadFile(event: any) {
    // Save uploaded image to storage db
    const file = event.target.files[0];
    const storage_path = 'categoryImages';
    const filename = event.target.files[0].name;
    const path = storage_path + `/${filename}`;
    const storageRef = ref(this.storage, path);
    // Upload/Save above file to firebast storage
    const task = uploadBytesResumable(storageRef, file);

    // const task = this.storage.upload(path, this.loadedFile);
    // const ref = this.storage.ref(path);

    // const file = event.target.files[0];
    // const storage_path = 'categoryImages';
    // const filename = event.target.files[0].name;
    // const filePath = storage_path + `/${filename}`;
    // // const ref = this.storage.ref(filePath);
    // const storageRef = ref(this.storage, filePath);
    // // const task = ref.put(file);
    // const task = uploadBytesResumable(storageRef, file);
    // const url = getDownloadURL(storageRef);
    // console.log(url);

    // this.frmAddCategory.controls['imageurl'].setValue(
    //   event.target.files[0].name
    // );
    // this.imgfilename = event.target.files[0].name;

    // if (file) {
    //   try {
    //     this.uploadPercent = percentage(task);
    //     await task;
    //     const url = await getDownloadURL(storageRef);
    //     console.log(url);
    //   } catch (e: any) {
    //     console.error(e);
    //   }
    // }
  }

  getFileUrl(filename: any) {}
  // async upload(event: any): Promise<any> {
  //   let folder: string = 'categoryImages';
  //   let name = this.frmAddCategory.controls['file'].setValue(
  //     event.target.files[0].name
  //   );
  //   let file: File | null = event.target.files[0];

  //   const ext = file!.name.split('.').pop();
  //   const path = `${folder}/${name}.${ext}`;
  //   {
  //     if (file) {
  //       try {
  //         const storageRef = ref(this.storage, path);
  //         const task = uploadBytesResumable(storageRef, file);
  //         this.uploadPercent = percentage(task);
  //         await task;
  //         const url = await getDownloadURL(storageRef);
  //         return url;
  //       } catch (e: any) {
  //         console.error(e);
  //       }
  //     } else {
  //       // handle invalid file
  //     }
  //   }
  // }
  onSubmit(formValue: any): void {
    // this.frmAddCategory.controls['imageurl'].setValue(this.imgfilename);
    console.log(this.frmAddCategory.controls['imageurl']);

    this.firedb.addNewCategory(formValue).then((insertsuccess) => {
      console.log('return data in component=', insertsuccess);
    });
    // send formValue to calling component using Output
    // this.submitEvent.emit(formValue);
  }
}
