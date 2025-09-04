import InputField from "./Components/Search"
import SignUpPage from "./Components/Sign"
import Tasks from "./Components/Tasks"

function App() {

  return (
    <>
      <div className="flex">
        <SignUpPage />
        <InputField />
        <Tasks/>
      </div>
    </>
  )
}

export default App
