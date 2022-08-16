import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import AddQuestionPage from "./AddQuestionPage";
import SignInPage from "./SignInPage";
import Homepage from "./Homepage";
import MyCollectionPage from "./MyCollectionPage";

const App = () => {

  return (
    <BrowserRouter>
      <Main>
        <Routes>
          <Route exact path="/" element={<SignInPage />} />
          <Route exact path="/homepage" element={<Homepage />} />
          <Route path="/add-question" element={<AddQuestionPage />} />
          <Route path="/my-collections" element={<MyCollectionPage />} />
        </Routes>
      </Main>
    </BrowserRouter>
  )};

const Main = styled.div`
`;

export default App;


