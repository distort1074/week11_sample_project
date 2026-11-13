import CourseList from './components/CourseList.jsx';

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div>
          <h1>나의 학기 플래너</h1>
          <p className="subtitle">수강할 과목을 정리하고 과목별 학습 완료 여부를 기록하세요.</p>
        </div>
      </header>
      <CourseList />
      <footer className="bottom">새로고침하면 초기 과목 목록으로 돌아갑니다.</footer>
    </main>
  );
}
