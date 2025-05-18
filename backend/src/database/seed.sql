USE yoliday_db;

-- Insert sample projects
INSERT INTO projects (title, description, category, author, image_url) VALUES
('Kemampuan Merangkum Tulisan', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatibus ea tempus.Lorem ipsum dolor sit amet consectetur...', 'BAHASA SUNDA', 'Doni Al-Bajaj Samson', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80'),
('Kemampuan Merangkum Tulisan', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatibus ea tempus.Lorem ipsum dolor sit amet consectetur...', 'BAHASA SUNDA', 'Doni Al-Bajaj Samson', 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
('Kemampuan Merangkum Tulisan', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatibus ea tempus.Lorem ipsum dolor sit amet consectetur...', 'BAHASA SUNDA', 'Doni Al-Bajaj Samson', 'https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
('Project Management Basics', 'Learn the fundamentals of project management including planning, execution, and monitoring.', 'MANAGEMENT', 'Jane Smith', 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
('Web Development Fundamentals', 'Introduction to HTML, CSS, and JavaScript for web development beginners.', 'PROGRAMMING', 'John Doe', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
('Data Science Essentials', 'Explore the basics of data science, including data analysis, visualization, and machine learning.', 'DATA SCIENCE', 'Emily Johnson', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
('Digital Marketing Strategies', 'Learn effective digital marketing techniques for business growth and customer engagement.', 'MARKETING', 'Michael Brown', 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
('Financial Planning Basics', 'Understand the fundamentals of personal and business financial planning.', 'FINANCE', 'Sarah Wilson', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
('Public Speaking Skills', 'Develop confidence and techniques for effective public speaking and presentations.', 'COMMUNICATION', 'David Lee', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'),
('Leadership Development', 'Learn essential leadership skills for managing teams and driving organizational success.', 'MANAGEMENT', 'Lisa Anderson', 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');

-- Insert sample cart items
INSERT INTO cart (project_id, user_id) VALUES
(1, 1),
(3, 1),
(5, 1); 