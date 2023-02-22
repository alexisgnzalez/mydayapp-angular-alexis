import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  tasks: Array<Task> = [];
  pending: number = 0;

  constructor() {
    let data = localStorage.getItem('mydayapp-angular');
    if (data) {
      this.tasks = JSON.parse(data);
    }
  }

  addTask(title: string) {
    if (title != '') {
      let newTask: Task = {
        id: this.tasks.length,
        title: title.trim(),
        completed: false
      }
      this.tasks.push(newTask);
      this.updatePending();
      this.saveLocalData();
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.updatePending();
    this.saveLocalData();
  }

  getTasks() {
    return this.tasks;
  }

  completedTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.updatePending();
    this.saveLocalData();
  }

  editTaskTitle(index: number, newTitle: string) {
    if (newTitle != '') {
      this.tasks[index].title = newTitle;
      this.saveLocalData();
    }
  }

  updatePending() {
    this.pending = this.tasks.filter(task => task.completed === false).length;
  }

  eraseCompleted() {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.saveLocalData();
    return this.tasks;
  }

  saveLocalData() {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }
}
