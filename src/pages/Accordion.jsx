import faqs from "../assets/js/faqs";
const Accordion = () => {
    
    const showActiveContent = (e) => {
        let currentElement = e.currentTarget;
        currentElement.classList.toggle("show-text");
        const textContainer = currentElement.lastElementChild;
        let textHeight = textContainer.firstElementChild.getBoundingClientRect().height;
        if(currentElement.classList.contains('show-text')){
            textContainer.style.height = `${textHeight}px`;
        }else{
            textContainer.style.height = '0px'
        }
        let collapsibleElements = Array.from(document.querySelectorAll('div.collapsible'));
        collapsibleElements.forEach(element => {
            if(element !== currentElement){
                element.classList.remove("show-text");
                let  textContainer = element.lastElementChild;
                textContainer.style.height = '0px';
            }
        })
    }
    const showAnswer = (e) => {
        let currentElement = e.currentTarget;
        currentElement.classList.toggle("show-text");
        const textContainer = currentElement.lastElementChild;
        let textHeight = textContainer.firstElementChild.getBoundingClientRect().height;
        if(currentElement.classList.contains('show-text')){
            textContainer.style.height = `${textHeight}px`;
        }else{
            textContainer.style.height = '0px'
        }
        //hiding other faqs
        let faqs = Array.from(document.querySelectorAll('div.faq'));
        faqs.forEach(element => {
            if(element !== currentElement){
                element.classList.remove("show-text");
                let  textContainer = element.lastElementChild;
                textContainer.style.height = '0px';
            }
        })
    }
    
    return (
        <section className="accordion-section">
            <div className="heading">
                <h2>accordion</h2>
            </div>
            <div className="accordions">
                <div className="collapsibles">
                    <div className="title">
                        <h2>collapsible accordion</h2>
                    </div>
                    <div id="firstSlide" className="collapsible collapsible-1" onClick={showActiveContent}>
                        <div className="header header-1" >collapsible accordion 1</div>
                        <div data-id="firstSlide" className="content-container">
                           <div className="content">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. 
                            </div> 
                        </div>
                    </div>
                    <div id="secondSlide" className="collapsible collapsible-2" onClick={showActiveContent}>
                        <div className="header header-2">collapsible accordion 2</div>
                        <div data-id="secondSlide" className="content-container">
                           <div className="content">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.  
                            </div> 
                        </div>
                    </div>
                    <div id="thirdSlide" className="collapsible collapsible-3" onClick={showActiveContent}>
                        <div className="header header-3" >collapsible accordion 3</div>
                        <div data-id="thirdSlide" className="content-container">
                           <div className="content">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. 
                            </div> 
                        </div>
                    </div>
                    <div id="forthSlide" className="collapsible collapsible-4" onClick={showActiveContent}>
                        <div className="header header-4" >collapsible accordion 4</div>
                        <div data-id="forthSlide" className="content-container">
                           <div className="content">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. 
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="faqs">
                    <div className="heading">
                        <h2>FAQs</h2>
                    </div>
                    {
                        faqs.map(faq => {
                            const {id, question, answer} = faq;
                            return  <div className="faq" key={id}  onClick={showAnswer}>
                                        <div className="question">
                                            <p>{question}</p>
                                            <span className="icon-plus"><i className="fas fa-plus"></i></span>
                                            <span className="icon-minus"><i className="fas fa-minus"></i></span>
                                        </div>
                                        <div className="content-wrapper">
                                        <div className="content">
                                            {answer}    
                                        </div> 
                                        </div>
                                    </div> 
                        })
                    }
                    
                </div>
            </div>
        </section>
        
    )
}

export default Accordion;