import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../../shared/model/Course";
import {Lesson} from "../../shared/model/Lesson";
import {RoleType} from "../../shared/enum/RoleType";
import {UserToCourse} from "../../shared/model/UserToCourse";
import {User} from "../../shared/model/User";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  rootUrl = '/api/courses';
  idUrl = '/api/courses/:courseId';
  allLessonsUrl = '/api/courses/:courseId/lessons';
  finishUrl = '/api/courses/:courseId/finish';
  enrollUrl = '/api/courses/:courseId/enroll';
  usersUrl = '/api/courses/:courseId/users';
  userCourseInfoUrl = '/api/courses/:courseId/users/:userId';
  usersLessonsInfoUrl = '/api/courses/:courseId/lessons/:lessonId/users/:userId';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.rootUrl);
  }

  getById(courseId: number): Observable<Course> {
    let url = this.idUrl.replace(PathVariable.courseId.toString(), courseId.toString());
    return this.http.get<Course>(url);
  }

  getAllLessonsInCourse(courseId: number): Observable<Lesson[]> {
    let url = this.allLessonsUrl.replace(PathVariable.courseId.toString(), courseId.toString());
    return this.http.get<Lesson[]>(url);
  }

  delete(courseId: number): Observable<any> {
    let url = this.idUrl.replace(PathVariable.courseId.toString(), courseId.toString());
    return this.http.delete(url);
  }

  update(courseId: number, courseUpdate: Course): Observable<Course> {
    let url = this.idUrl.replace(PathVariable.courseId.toString(), courseId.toString());
    return this.http.put<Course>(url, courseUpdate);
  }

  finish(courseId: number): Observable<string> {
    let url = this.finishUrl.replace(PathVariable.courseId.toString(), courseId.toString());
    return this.http.put<string>(url, {});
  }

  enroll(courseId: number): Observable<UserToCourse> {
    let url = this.enrollUrl.replace(PathVariable.courseId.toString(), courseId.toString());
    return this.http.post<UserToCourse>(url, {});
  }

  getAllUsersForCourse(courseId: number, roleType: RoleType): Observable<User[]> {
    let url = this.usersUrl.replace(PathVariable.courseId.toString(), courseId.toString());
    const options = roleType ?
      {params: new HttpParams().set('roleType', roleType.toString())} : {};

    return this.http.get<User[]>(url, options);
  }

  getUsersCourseInfo(courseId: number, userId: number): Observable<UserToCourse> {
    let url = this.userCourseInfoUrl
      .replace(PathVariable.courseId.toString(), courseId.toString())
      .replace(PathVariable.userId.toString(), userId.toString());
    return this.http.get<UserToCourse>(url);
  }

  updateUsersCourseInfo(courseId: number, userId: number, userToCourseUpdate: UserToCourse): Observable<UserToCourse> {
    let url = this.userCourseInfoUrl
      .replace(PathVariable.courseId.toString(), courseId.toString())
      .replace(PathVariable.userId.toString(), userId.toString());
    return this.http.put<UserToCourse>(url, userToCourseUpdate);
  }

  updateUsersLessonInfo(courseId: number, lessonId: number, userId: number,
                        userToCourseUpdate: UserToCourse): Observable<UserToCourse> {
    let url = this.usersLessonsInfoUrl
      .replace(PathVariable.courseId.toString(), courseId.toString())
      .replace(PathVariable.lessonId.toString(), lessonId.toString())
      .replace(PathVariable.userId.toString(), userId.toString());
    return this.http.put<UserToCourse>(url, userToCourseUpdate);
  }

}

enum PathVariable {

  courseId = ":courseId",
  lessonId = ":lessonId",
  userId = ":userId",

}