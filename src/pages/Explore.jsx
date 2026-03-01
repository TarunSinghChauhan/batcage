import React from 'react';

const exploreItems = [
    'batman', 'joker', 'superman', 'car', 'bike',
    'gotham', 'darkness', 'hero', 'villain', 'night',
    'comic', 'action', 'musclecar', 'motorcycle', 'cityscape'
];

const Explore = () => {
    return (
        <div className="p-1 md:p-4">
            <div className="grid grid-cols-3 gap-1 md:gap-4">
                {exploreItems.map((keyword, i) => (
                    <div key={i} className="aspect-square bg-dark-surface border border-dark-border cursor-pointer hover:border-blood transition-colors overflow-hidden group">
                        <img
                            src={`https://loremflickr.com/300/300/${keyword}?lock=${i}`}
                            alt={keyword}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Explore;
