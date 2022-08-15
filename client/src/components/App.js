import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import AddQuestionPage from "./AddQuestionPage";
import SignInPage from "./SignInPage";
import HomePage from "./HomePage";
import MyCollectionPage from "./MyCollectionPage";

const App = () => {

  return (
    <BrowserRouter>
      {/* <GlobalStyles /> */}
      {/* <Header /ß> */}
      <Main>
        <Routes>
          <Route exact path="/" element={<SignInPage />} />
          <Route exact path="/dashboard" element={<HomePage />} />
          <Route path="/add-question" element={<AddQuestionPage />} />
          <Route path="/my-collections" element={<MyCollectionPage />} />
        </Routes>
      </Main>
      {/* <Footer /> */}
    </BrowserRouter>
  )};

const Main = styled.div`
`;

export default App;


