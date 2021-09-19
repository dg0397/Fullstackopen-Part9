import React from 'react';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
  description : string
}

interface CourseNormalPart extends CoursePartWithDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDescription {
  type: "special";
  requirements : Array<string>
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]

interface HeaderProps {
  name:string
}

interface DataProps {
  data : Array<CoursePart>
}

const assertNever = (value:never) :never =>{
  throw new Error(
    `Unhandled discriminated union menber: ${JSON.stringify(value)}`
  );
};


const Part = ({data}:DataProps) => {
  return(
    <>
      {
        data.map( part => {
          switch (part.type) {
            case 'normal' : {
              return (
                <div>
                  <h3>{part.name} {part.exerciseCount}</h3>
                  <em>{part.description}</em>
                </div>
              )
            }
            case 'groupProject' : {
              return (
                <div>
                  <h3>{part.name} {part.exerciseCount}</h3>
                  <p>project exercises {part.groupProjectCount}</p>
                </div>
              )
            }
            case 'submission' : {
              return (
                <div>
                  <h3>{part.name} {part.exerciseCount}</h3>
                  <em>{part.description}</em>
                  <p>submit to {part.exerciseSubmissionLink}</p>
                </div>
              )
            }
            case 'special': {
              return (
                <div>
                  <h3>{part.name} {part.exerciseCount}</h3>
                  <em>{part.description}</em>
                  <p>required skils {part.requirements.join(', ')}</p>
                </div>
              )
            }
            default:{
              return assertNever(part)
            }
          }
        })
      }
    </>
  )
}
const Header = ({name}:HeaderProps):JSX.Element => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({data:content}:DataProps):JSX.Element => {
  return (
    <>
      <Part data = {content}/>
    </>
  )
};

const Total = ({data}:DataProps) : JSX.Element => {
  const total = data.reduce((a,b)=> a + b.exerciseCount,0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  return (
    <div>
      <Header name={courseName} />
      <Content data = {courseParts} />
      <Total data = {courseParts}  />
    </div>
  )
}

export default App;
