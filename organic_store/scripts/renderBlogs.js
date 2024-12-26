export const renderBlogs = (blogs, appendContainer, startWith, endWith) => {

  if(!blogs) {
    return;
  }
  
  // Render Blog
  const renderBlog = (id, date, type, image, title, heading, description, blogText) => {
    
    // References
    let showBlogContainerEl = document.querySelector(appendContainer);
    let blogTemplateEl = document.getElementById("blog-template");
    let blogTemplate = document.importNode(blogTemplateEl.content, true);

    // Fixing Long Title Issue
    let shortTitle = title;
    if(title.length > 50) {
      shortTitle = title.slice(0, 50) + "..."
    }

    // Changing Data According To blog
    blogTemplate.querySelector(".blog-container").setAttribute("id", `blogNo${id}`);
    blogTemplate.querySelector(".blog-img").src = image;
    blogTemplate.querySelector(".blog-img").alt = title;
    blogTemplate.querySelector(".type").textContent = type;
    blogTemplate.querySelector(".date").textContent = date;
    blogTemplate.querySelector(".blog-title").textContent = shortTitle;
    blogTemplate.querySelector(".blog-details").textContent = description;
    showBlogContainerEl.appendChild(blogTemplate);
  }

  // request For render Blogs
  let renderTheseBlogs = blogs.slice(startWith, endWith);
  const requestForRenderBlog = () => {
    renderTheseBlogs.forEach(currentBlog => {
      const {id, date, type, image, title, heading, description, blogText} = currentBlog;
      renderBlog(id, date, type, image, title, heading, description, blogText);
    });
  };
  requestForRenderBlog();
};