import { useState, useEffect, useRef } from "react";
import "../assets/css/calendar.css";

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Calendar = () => {
    const [currentYear, setCurrentYear] = useState(currYear);
    const [currentMonth, setCurrentMonth] = useState(currMonth);
    const selectDateRef = useRef(null);
    const renderCalendar = () => {
        let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate(); // getting last date of previous month
        let liTag = [];

        for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
            liTag.push(<li key={i*2} className="inactive">{lastDateofLastMonth - i + 1}</li>) ;
        }

        for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
            // adding active class to li if the current day, month, and year matched
            let isToday = i === date.getDate() && currentMonth === new Date().getMonth() 
                        && currentYear === new Date().getFullYear() ? "active" : "";
           	 liTag.push(<li key={i*48} className={isToday}>{i}</li>)
        }

        for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
			liTag.push(<li key={i*88}  className="inactive">{i - lastDayofMonth + 1}</li>)
        }
        return liTag;
    }
	//handle month change
	const changeMonth = (e) => {
		e.currentTarget.id === 'prev' ? setCurrentMonth((prevMonth) => prevMonth - 1) : setCurrentMonth((prevMonth) => prevMonth + 1);
	}
	const showSelectDate = () => {
		selectDateRef.current.classList.add("show");
	}
	const hideSelectDate = () => {
		selectDateRef.current.classList.remove("show");
	}
	const changeYear = (e) => {
		let id = e.currentTarget.dataset.id
		switch (id) {
			case 'pre':
				setCurrentYear(prevYear => prevYear - 1);
				break;
			case 'nxt':
				setCurrentYear(prevYear => prevYear + 1);
				break;
			default:
				break;
		}
	}
	const selectMonth = (e) => {
		let newMonth = e.currentTarget.dataset.id;
		//!IMPORTANT: Please change the data type of newMonth to number to get correct date
		setCurrentMonth(prevMonth => Number(newMonth));
		hideSelectDate();
	}
	useEffect(() => {
		if(currentMonth < 0 || currentMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currentYear, currentMonth, new Date().getDate());
            setCurrentYear(date.getFullYear()); // updating current year with new date year
            setCurrentMonth(date.getMonth()); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        //renderCalendar();
	},[currentMonth, currentYear])
    return (
        <div className="wrapper">
	      <header>
	        <span className="icons" id="prev" onClick={changeMonth}>
	          <i className="fas fa-arrow-circle-left"></i>
	        </span>
	        <p className="current-date" onClick={showSelectDate}>{months[currentMonth]} {currentYear}</p>
	        <span className="icons" id="next" onClick={changeMonth}>
	          <i className="fas fa-arrow-circle-right"></i>
	        </span>
	      </header>
	      <div className="calendar">
	        <ul className="weeks">
	          <li>Su</li>
	          <li>Mo</li>
	          <li>Tu</li>
	          <li>We</li>
	          <li>Th</li>
	          <li>Fr</li>
	          <li>Sa</li>
	        </ul>
	        <ul className="days">
               {renderCalendar()}
            </ul>
	      </div>
	     
	      <div className="select-date" ref={selectDateRef}>
	      	<div className="header">
	      		<span className="change-year" data-id="pre" onClick={changeYear}>
	      			<i className="fas fa-arrow-circle-left"></i>
	      		</span>
	      		<p className="year">{currentYear}</p>
	      		<span className="change-year" data-id="nxt"  onClick={changeYear}>
	      			<i className="fas fa-arrow-circle-right"></i>
	      		</span>
	      		<div className="close-select-date" onClick={hideSelectDate}>
	      			<i className="fas fa-times"></i>
	      		</div>
	      	</div>
	      	<ul className="months">
			  {
				months.map((month, index) => {
					return <li data-id={index} key={index} onClick={selectMonth}><button>{month.slice(0,3)}</button></li>
				})
			  }
	      	</ul>
	      </div>
	    </div>
    )
}

export default Calendar;