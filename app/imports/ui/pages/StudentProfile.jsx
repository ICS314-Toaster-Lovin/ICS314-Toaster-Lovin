import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Ingredient } from '../../api/ingredient/Ingredient';
import { Recipe } from '../../api/recipe/Recipe';
import { Students } from '../../api/student/Student';
import { StudentInfoItem, StudentIngredientItem, StudentRecipeItem } from '../components/StudentProfilePageItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const StudentProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, students, ingredients, recipes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub1 = Meteor.subscribe(Students.userPublicationName);
    const sub2 = Meteor.subscribe(Recipe.userPublicationName);
    const sub3 = Meteor.subscribe(Ingredient.userPublicationName);
    // Determine if the subscription is ready
    const rdy = sub1.ready() && sub2.ready() && sub3.ready();
    // const rdy = sub2.ready() && sub3.ready();
    // Get the Stuff documents
    const studentInfoItems = Students.collection.find({}).fetch();
    const studentRecipeItems = Recipe.collection.find({}).fetch();
    const studentIngredientItems = Ingredient.collection.find({}).fetch();
    return {
      students: studentInfoItems,
      recipes: studentRecipeItems,
      ingredients: studentIngredientItems,
      ready: rdy,
    };
  }, []);
  const owner = Meteor.user().username;
  const filteredStudents = students.filter(stu => stu.owner === owner);
  const filteredRecipes = recipes.filter(rec => rec.owner === owner);
  const filteredIngredients = ingredients.filter(ing => ing.owner === owner);

  return (ready ? (
    <Container className="py-3" id="student-profile-page">
      <Row className="justify-content-center">
        <Col md={7}>
          {filteredStudents.map((student) => <StudentInfoItem key={student.id} student={student} />)}
        </Col>
        <Row className="pt-4">
          <Col className="text-center">
            <h3>Recipes</h3>
            {filteredRecipes.map((recipe) => <StudentRecipeItem key={recipe._id} recipe={recipe} />)}
          </Col>
          <Col className="text-center">
            <h3>Ingredients</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {filteredIngredients.map((ingredient) => <StudentIngredientItem key={ingredient._id} ingredient={ingredient} />)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudentProfile;
