import React, { Component } from 'react';
import QueryTextInput from './TextFieldQuery';
import DropDownInput from './TextFieldSkills';
import Jobs from './Jobs.js';

const JOB_API_URL = 'http://localhost:9000/jobs'

const mockJobs = [
  {
    title: 'Junior Developer', company: 'Google',
    location: 'Toronto, On', 
    keyWords: ['C++','MySQL','HTML5','CSS','Javascript'],
    link: "https://careers.google.com/teams/engineering-technology/",
  },
  {
    title: 'SDE 1', company: 'Amazon',
    location: 'Toronto, On', 
    keyWords: ['Python','C++','MongoDB','Git','Javascript'],
    link: "https://www.amazon.jobs/en/jobs/1033022/sde1",
  }
]
var string = "";

export default class Layout extends Component {
  constructor(){
      super();
        this.state = {
            option: '',
            location: '',
            skills: [],
            jobs: [
                /*{
                  title: 'Junior Developer', company: 'Google',
                  location: 'Toronto, On', 
                  keyWords: ['C++','MySQL','HTML5','CSS','Javascript'],
                  link: "https://careers.google.com/teams/engineering-technology/",
                },
                {
                  title: 'SDE 1', company: 'Amazon',
                  location: 'Toronto, On', 
                  keyWords: ['Python','C++','MongoDB','Git','Javascript'],
                  link: "https://www.amazon.jobs/en/jobs/1033022/sde1",
                }*/
              ]

        };
  }


  changeOption(selectedOption){
      this.setState({option: selectedOption.value})
      //console.log(this.state.option);
  }
  changeSkills(selectedSkills){
    if(selectedSkills!== null){
      this.setState({skills:selectedSkills.map(s => s.value)})
    }
  }

  async fetchJobs(){
    /*try{
        const jobs = fetch(JOB_API_URL)
        const json = await jobs.json
        console.log({json})
    }catch(error){
        console.log(error.message)
    }*/
    const res = await fetch(JOB_API_URL)
    const data = await res.json()
    await this.setState({jobs:data.jobs})
    //console.log({data})
  }

  async submitRequest(){
      const option = this.state.option
      const skills = this.state.skills
      await fetch(JOB_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({option,skills})
      })
  }

  async sendAlert(){
    alert("Fetching jobs");
  }



  render(){
  return (
    <div className= "Layout">
      <div className = "header-content">
        <h1 className = "Title">Job Aggregator</h1>
        <p className = "header-description">We search Indeed, ZipRecruiter, and StackoverflowJobs to find
        the best job postings for you. Simply enter a search inquiry
        as well as your marketable skills and we'll 
        match you with job postings who are looking for those exact skills.
        </p>
        <QueryTextInput changeOption = {this.changeOption.bind(this)}/>
        <input
          type="text"
          placeholder = "Location (Optional)"
          style = {{width:200}}
        />
        <DropDownInput changeSkills = {this.changeSkills.bind(this)}/>
        <button onClick = {async () => 
          {
              /*console.log(this.state.option);
              console.log(this.state.skills);
              this.setState({jobs:[{
                title: 'Junior Developer', company: 'Google',
                location: 'Toronto, On', 
                keyWords: ['C++','MySQL','HTML5','CSS','Javascript'],
                link: "https://careers.google.com/teams/engineering-technology/",
              },
            ]
            });*/
            alert("fetching jobs");
            await this.submitRequest();
            await this.fetchJobs();
          }
         

        }> Submit</button>      
      </div>
     
      <Jobs jobs = {this.state.jobs}/>
    </div>
  );
  }
}
