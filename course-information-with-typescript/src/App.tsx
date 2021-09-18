import React from 'react';

interface HeaderProps {
  name:string
}

interface ContentPropsTypes {
  name : string;
  exerciseCount : number
} 

interface DataProps {
  data : Array<ContentPropsTypes>
}
const Header = ({name}:HeaderProps):JSX.Element => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({data:content}:DataProps):JSX.Element => {
  return (
    <>
      {
        content.map(({name,exerciseCount}) => {
          return(
            <p key = {name}>{name} {exerciseCount}</p>
          )
        })
      }
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
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  return (
    <div>
      <Header name={courseName} />
      <Content data = {courseParts} />
      <Total data = {courseParts}  />
    </div>
  )
}

export default App;
