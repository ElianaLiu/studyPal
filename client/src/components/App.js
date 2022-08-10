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
      {/* <Header /> */}
      <Main>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/Sign-in" element={<SignInPage />} />
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


