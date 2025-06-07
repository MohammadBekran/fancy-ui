import Button from "@/features/button/components";
import Calendar from "@/features/calendar/components";
import Modal from "@/features/modal/components";

const App = () => {
  return (
    <Modal title="Hello" trigger={<Button>Pick up a date</Button>}>
      <div className="mt-2">
        <Calendar showOutsideDays={false} placeholder="" showWeekNumbers />
      </div>
    </Modal>
  );
};

export default App;
