import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import AddQuestionPage from "./AddQuestionPage";
import SignInPage from "./SignInPage";
import HomePage from "./HomePage";
import ButtonPage from "./ButtonPage";
import MyCollectionPage from "./MyCollectionPage";

const App = () => {

  return (
    <BrowserRouter>
      <Main>
        <Routes>
          <Route exact path="/" element={<SignInPage />} />
          <Route exact path="/dashboard" element={<HomePage />} />
          <Route exact path="/button-page" element={<ButtonPage />} />
          <Route path="/add-question" element={<AddQuestionPage />} />
          <Route path="/my-collections" element={<MyCollectionPage />} />
        </Routes>
      </Main>
    </BrowserRouter>
  )};

const Main = styled.div`
`;

export default App;


