import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Dropdown,
  Accordion,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const Movies = () => {
  const { popularMovies } = useSelector((state) => state.movie);

  const [filteringMovies, setFilteringMovies] = useState(popularMovies);

  // console.log(popularMovies);

  const handleSort = (what, how) => {
    // React에서 state는 불변성을 유지해야 하기 때문에
    // 전개 연산자를 통해서 새로운 배열을 생성하고 sort() 함수를 실행해야 한다.
    // 정렬된 배열을 state에 다시 초기화해주면 영화정보가 정렬되어 출력된다.
    if (what === "title") {
      if (how === "asc") {
        setFilteringMovies([...popularMovies].sort((a, b) => a.title.localeCompare(b.title)));
      } else {
        setFilteringMovies([...popularMovies].sort((a, b) => b.title.localeCompare(a.title)));
      }
    } else if (what === "score") {
      if (how === "asc") {
        setFilteringMovies([...popularMovies].sort((a, b) => a.vote_average - b.vote_average));
      } else {
        setFilteringMovies([...popularMovies].sort((a, b) => b.vote_average - a.vote_average));
      }
    } else {
      if (how === "asc") {
        setFilteringMovies([...popularMovies]);
      } else {
        setFilteringMovies([...popularMovies].reverse());
      }
    }
  };

  return (
    <div>
      <Container>
        <Row style={{ padding : '20px 0px' }}>
          <Col>
            <h1>인기 영화 필터링</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>정렬</Accordion.Header>
                <Accordion.Body>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">정렬방식을 선택하세요.</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleSort("title", "asc")}>제목 오름차순</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSort("title", "desc")}>제목 내림차순</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSort("score", "asc")}>평점 오름차순</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSort("score", "desc")}>평점 내림차순</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSort("", "asc")}>인기도 오름차순</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSort("", "desc")}>인기도 내림차순</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col sm={9} className="movie-card-list">
            {filteringMovies.map((movie, idx) => (
              <Card key={idx} style={{ width: "13rem" }}>
                <Card.Img variant="top" src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}/>
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.release_date}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movies;
