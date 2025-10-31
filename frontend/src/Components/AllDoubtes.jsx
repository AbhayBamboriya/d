import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AllDoubtes = () => {
  const [doubts, setDoubts] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All");

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/doubts/", { withCredentials: true });
        console.log("Fetched Doubts:", res.data);

        // Assuming res.data.Doubts is the array
        const doubtsArray = res.data.Doubts || res.data || [];

        setDoubts(doubtsArray);
        setFilteredDoubts(doubtsArray);

        // Extract unique subjects
        const uniqueSubjects = ["All", ...new Set(doubtsArray.map(d => d.Subject).filter(Boolean))];
        setSubjects(uniqueSubjects);

      } catch (err) {
        console.error("Error fetching doubts:", err);
      }
    };

    fetchDoubts();
  }, []);

  // Handle dropdown change
  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);

    if (subject === "All") {
      setFilteredDoubts(doubts);
    } else {
      const filtered = doubts.filter(d => d.Subject === subject);
      setFilteredDoubts(filtered);
    }
  };

  return (
    <Container>
      <Title>List of Doubts</Title>

      {/* Subject Filter Dropdown */}
      <FilterContainer>
        <label htmlFor="subjectFilter">Filter by Subject: </label>
        <Select id="subjectFilter" value={selectedSubject} onChange={handleSubjectChange}>
          {subjects.map((subj, index) => (
            <option key={index} value={subj}>
              {subj}
            </option>
          ))}
        </Select>
      </FilterContainer>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Subject</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>View Answers</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {filteredDoubts.length > 0 ? (
            filteredDoubts.map((doubt, index) => (
              <TableRow key={index}>
                <TableData>{doubt.title}</TableData>
                <TableData>{doubt.Subject}</TableData>
                <TableData>{doubt.description}</TableData>
                <TableData>
                  <Link to={`/answer/${doubt.id}`}>
                    <StyledLink>Answer</StyledLink>
                  </Link>
                </TableData>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableData colSpan="4">No doubts found</TableData>
            </TableRow>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllDoubtes;



// --- styled components section below ---
const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #343a40;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #007bff;
  color: white;
`;

const TableData = styled.td`
  padding: 12px;
  border: 1px solid #dee2e6;
  text-align: left;
`;

const StyledLink = styled.span`
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

// ✅ Add your filter styles here (at the bottom)
const FilterContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
`;

const Select = styled.select`
  margin-left: 10px;
  padding: 6px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
`;