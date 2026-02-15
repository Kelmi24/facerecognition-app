import React from "react";

const Rank = ({ name, entries }) => {
    return (
        <div className="center flex flex-column mt4 mb4">
            <div className="white f3 mb3" style={{ color: 'var(--text-secondary)' }}>
                {`${name}, your current entry count is...`}
            </div>
            <div className="white f1">
                {entries}
            </div>
        </div>
    );
}

export default Rank