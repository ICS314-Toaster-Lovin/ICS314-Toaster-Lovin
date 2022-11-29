import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipe } from '../../api/recipe/Recipe';
import { Students } from '../../api/student/Student';
import { StudentInfoItem, StudentRecipeItem } from '../components/StudentProfilePageItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const StudentProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, students, recipes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub1 = Meteor.subscribe(Students.userPublicationName);
    const sub2 = Meteor.subscribe(Recipe.userPublicationName);
    // Determine if the subscription is ready
    const rdy = sub1.ready() && sub2.ready();
    // const rdy = sub2.ready() && sub3.ready();
    // Get the Stuff documents
    const studentInfoItems = Students.collection.find({}).fetch();
    const studentRecipeItems = Recipe.collection.find({}).fetch();
    return {
      students: studentInfoItems,
      recipes: studentRecipeItems,
      ready: rdy,
    };
  }, []);
  const owner = Meteor.user().username;
  const filteredStudents = students.filter(stu => stu.owner === owner);
  const filteredRecipes = recipes.filter(rec => rec.owner === owner);

  return (ready ? (
    <Container className="py-3" id="student-profile-page">
      <Row className="justify-content-center">
        <Col md={7} className="justify-content-center">
          {filteredStudents.map((student) => <StudentInfoItem key={student.id} student={student} />)}
        </Col>
        <Row className="pt-4">
          <h3 className="text-center">Recipes</h3>
          <Row xs={1} md={3}>
            {filteredRecipes.map((recipe, index) => <Col className="col-sm-3" key={index}><StudentRecipeItem key={recipe._id} recipe={recipe} /></Col>)}
          </Row>
        </Row>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudentProfile;
