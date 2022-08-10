import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import AddQuestionPage from "./AddQuestionPage";

const App = () => {

  return (
    <BrowserRouter>
      {/* <GlobalStyles /> */}
      {/* <Header /> */}
      <Main>
        <Routes>
          {/* <Route exact path="/" element={<HomePage />} /> */}
          <Route path="/add-question" element={<AddQuestionPage />} />
        </Routes>
      </Main>
      {/* <Footer /> */}
    </BrowserRouter>
  )};

const Main = styled.div`
`;

export default App;
