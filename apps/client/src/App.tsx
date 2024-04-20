import GameView from "./components/GameView/GameView";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <>
      <Sidebar />
      <div className='grid place-items-center bg-gray-900 h-screen'>
        <GameView />
      </div>
    </>
  );
}
