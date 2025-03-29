import CustomersPage from "./component/CustomersPage";
import TrainingsPage from "./component/TrainingsPage";
function App() {
  return (
    <>
      <h1>Welcome to Hien's page</h1>
      <div className="card">
        <p>Personal trainer project</p>
      </div>
      <CustomersPage />
      <TrainingsPage />
    </>
  );
}

export default App;
