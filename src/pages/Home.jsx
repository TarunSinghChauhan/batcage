import React, { useState, useEffect } from 'react';
import PostCard from '../components/Post/PostCard';

const initialPosts = [
    {
        id: 1,
        username: 'brucewayne',
        imageUrl: 'https://loremflickr.com/1000/1000/batman?lock=1',
        likes: 420,
        caption: 'Darkness is my ally.',
        commentsCount: 23,
        timestamp: '2 HOURS AGO',
        location: 'Gotham Inner City'
    },
    {
        id: 2,
        username: 'selinakyle',
        imageUrl: 'https://loremflickr.com/1000/1000/catwoman?lock=2',
        likes: 89,
        caption: 'Purrfect night for a stroll.',
        commentsCount: 15,
        timestamp: '5 HOURS AGO',
        location: 'Diamond District'
    },
    {
        id: 3,
        username: 'the_joker',
        imageUrl: 'https://loremflickr.com/1000/1000/joker?lock=3',
        likes: 1204,
        caption: 'Why so serious? 🃏',
        commentsCount: 302,
        timestamp: '6 HOURS AGO',
        location: 'Arkham Asylum'
    },
    {
        id: 4,
        username: 'wayne_enterprises',
        imageUrl: 'https://loremflickr.com/1000/1000/batmobile?lock=4',
        likes: 830,
        caption: 'The latest prototype. Does it come in black?',
        commentsCount: 45,
        timestamp: '1 DAY AGO',
        location: 'Wayne Tech Applied Sciences'
    },
    {
        id: 5,
        username: 'gotham_pd',
        imageUrl: 'https://loremflickr.com/1000/1000/policecar?lock=5',
        likes: 112,
        caption: 'On patrol. Stay safe out there.',
        commentsCount: 8,
        timestamp: '2 DAYS AGO',
        location: 'GCPD Headquarters'
    }
];

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('batcave_posts') || 'null');
        if (savedPosts && savedPosts.length > 0) {
            setPosts(savedPosts);
        } else {
            setPosts(initialPosts);
            localStorage.setItem('batcave_posts', JSON.stringify(initialPosts));
        }
    }, []);

    const handleDeletePost = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem('batcave_posts', JSON.stringify(updatedPosts));
    };

    return (
        <div className="max-w-xl mx-auto py-6 sm:px-4">
            <div className="space-y-4">
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onDelete={() => handleDeletePost(post.id)}
                    />
                ))}
            </div>
            {/* Loading state / end of feed placeholder */}
            <div className="py-8 text-center text-gray-600 font-serif tracking-widest text-sm uppercase">
                End of the line
            </div>
        </div>
    );
};

export default Home;
