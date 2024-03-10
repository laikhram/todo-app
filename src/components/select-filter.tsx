import { useState } from 'react';
import { BsChevronDown } from "react-icons/bs";
import { useRecoilState } from 'recoil';
import { filterState } from '../recoils';
import '../styles/index.scss';

function SelectFilter() {
    const [filter, setFilter] = useRecoilState(filterState);

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (value: string) => {
        setFilter(value);
        setIsOpen(false);
    }

    return (
        <div className="SelectFilter">
            <div className="dropdown">
                <button
                    className="dropbtn"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)} <BsChevronDown />
                </button>
                <div className={"dropdown-content " + (isOpen ? 'show' : '')}>
                    <a onClick={() => handleClick('all')}>All</a>
                    <a onClick={() => handleClick('done')}>Done</a>
                    <a onClick={() => handleClick('undone')}>Undone</a>
                </div>
            </div>
        </div>
    );
}

export default SelectFilter;
