import { useRef, useState } from 'react';
import CourseItem from './CourseItem.jsx';
import { initialCourses } from '../data/courses.js';

export default function CourseList() {
  // [제공] 초기 배열을 useState로 관리합니다.
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState('');
  const [addError, setAddError] = useState('');
  const nextId = useRef(Math.max(0, ...initialCourses.map(course => course.id)) + 1);

  // [제공] 삭제 기능: filter로 새 배열을 만들어 업데이트합니다.
  function handleDelete(id) {
    if (!window.confirm('이 과목을 삭제하시겠습니까?')) return;
    setCourses(previous => previous.filter(course => course.id !== id));
  }

  function handleAdd(event) {
    event.preventDefault();
    const name = newName.trim();

    if (!name) {
      setAddError('과목명을 입력하세요.');
      return;
    }

    const newCourse = { id: nextId.current, name, category: '미분류', completed: false };
    nextId.current += 1;
    setCourses(previous => [...previous, newCourse]);
    setNewName('');
    setAddError('');
  }

  // TODO 2 (필수): 완료 상태 변경 기능을 구현하세요.
  function handleToggle(id) {
    // TODO: map과 spread(...)를 사용하여 해당 id의 completed를 반전
  }

  const doneCount = courses.filter(course => course.completed).length;

  return (
    <>
      <section className="stats" aria-label="과목 통계">
        <div className="stat"><span>전체 과목</span><strong>{courses.length}</strong></div>
        <div className="stat"><span>완료</span><strong className="green">{doneCount}</strong></div>
        <div className="stat"><span>진행 중</span><strong className="blue">{courses.length - doneCount}</strong></div>
      </section>
      <section className="panel">
        <div className="panel-header"><h2>과목 목록</h2><span className="small-note">{courses.length}개</span></div>
        <form className="add-form" onSubmit={handleAdd}>
          <input
            className="input"
            value={newName}
            onChange={event => {
              setNewName(event.target.value);
              setAddError('');
            }}
            placeholder="새 과목명을 입력하세요"
            aria-label="새 과목명"
            aria-invalid={Boolean(addError)}
            aria-describedby={addError ? 'add-error' : undefined}
          />
          <button className="btn primary" type="submit">과목 추가</button>
        </form>
        {addError && <p className="error" id="add-error" role="alert">{addError}</p>}
        <div className="list-head"><span>COURSE</span><span>CATEGORY</span><span>ACTIONS</span></div>
        {courses.length === 0 && <div className="empty">등록된 과목이 없습니다.</div>}
        {courses.map(course => (
          <CourseItem key={course.id} course={course} onDelete={handleDelete} onToggle={handleToggle} />
        ))}
      </section>
    </>
  );
}
