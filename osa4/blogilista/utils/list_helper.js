const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }
    return blogs.reduce((favorite, blog) => {
        return(favorite.likes > blog.likes) ? favorite : blog;
    }, blogs[0]);
} 

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    most = 0
    let authors = {}
    blogs.forEach((blog) => {
            if (blog.author in authors) {
                authors[blog.author]++;
            } else {
                authors[blog.author] = 1
            }
        }
    )
    let max = {
        "author": "",
        "blogs": 0
    }
    for (const [author, blog_count] of Object.entries(authors)) {
        if (blog_count >= max.blogs) {
            max = {
                "author": author,
                "blogs": blog_count
            }
        }
    }
    return max
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    most = 0
    let authors = {}
    blogs.forEach((blog) => {
            if (blog.author in authors) {
                authors[blog.author] += blog.likes;
            } else {
                authors[blog.author] = blog.likes
            }
        }
    )
    let max = {
        "author": "",
        "likes": 0
    }
    for (const [author, likes] of Object.entries(authors)) {
        if (likes >= max.likes) {
            max = {
                "author": author,
                "likes": likes
            }
        }
    }
    return max
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
