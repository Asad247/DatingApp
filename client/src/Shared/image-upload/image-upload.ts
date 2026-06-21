import { Component, EventEmitter, Output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberService } from '../../Core/services/member-service';
import { ToastService } from '../../toast-service';

interface FileWithPreview {
  file: File;
  previewUrl: string;
  progress: number;
  error?: boolean;
}

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.css',
})
export class ImageUpload {
  @Output() filesSelected = new EventEmitter<File[]>();

  private memberService = inject(MemberService);
  private toastService = inject(ToastService);

  protected files = signal<FileWithPreview[]>([]);
  protected isDragOver = signal(false);

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  private handleFiles(fileList: FileList): void {
    const validFiles: FileWithPreview[] = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        validFiles.push({
          file,
          previewUrl,
          progress: 0
        });
      }
    }

    this.files.update(current => [...current, ...validFiles]);
  }

  protected removeFile(index: number): void {
    this.files.update(current => {
      const updated = [...current];
      // Revoke object URL to avoid memory leaks
      URL.revokeObjectURL(updated[index].previewUrl);
      updated.splice(index, 1);
      return updated;
    });
  }

  protected uploadFiles(): void {
    const fileList = this.files();
    if (fileList.length === 0) return;

    const rawFiles = fileList.map(f => f.file);
    this.filesSelected.emit(rawFiles);
    
    fileList.forEach((fileObj, idx) => {
      this.files.update(current => {
        const updated = [...current];
        if (updated[idx]) {
          updated[idx].progress = 10;
          updated[idx].error = false;
        }
        return updated;
      });

      let currentProgress = 10;
      const interval = setInterval(() => {
        if (currentProgress < 90) {
          currentProgress += Math.floor(Math.random() * 15) + 5;
          this.files.update(current => {
            const updated = [...current];
            if (updated[idx] && !updated[idx].error && updated[idx].progress < 90) {
              updated[idx].progress = currentProgress;
            }
            return updated;
          });
        }
      }, 200);

      this.memberService.uploadPhoto(fileObj.file).subscribe({
        next: (photo) => {
          clearInterval(interval);
          this.toastService.success(`${fileObj.file.name} uploaded successfully!`);
          this.files.update(current => {
            const updated = [...current];
            if (updated[idx]) {
              updated[idx].progress = 100;
            }
            return updated;
          });
        },
        error: (err) => {
          clearInterval(interval);
          console.error('Upload failed for file:', fileObj.file.name, err);
          this.toastService.error(`Failed to upload ${fileObj.file.name}`);
          this.files.update(current => {
            const updated = [...current];
            if (updated[idx]) {
              updated[idx].error = true;
              updated[idx].progress = 0;
            }
            return updated;
          });
        }
      });
    });
  }

  protected clearAll(): void {
    this.files().forEach(f => URL.revokeObjectURL(f.previewUrl));
    this.files.set([]);
  }
}
