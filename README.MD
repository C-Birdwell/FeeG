FeeG
Front end environment Gulp



*** Quick Start Notes ***
	* Instructions are written for Microsoft 10 using Git Bash (shouldn't be to much difference on other systems)
	* Requires Sass to be installed on machine

1. Instillation Node and Gulp (skip if you have these)
	A. You're going to have to have Node.js installed on your machine for any of this to work. https://nodejs.org/en/
	B. From your command line install Gulp globally < npm install -g gulp >   

2. Setup of Enviroment
	A. Navigate to the directory of your project < cd ~/path/directory >
	B. Place the package.json and gulpfile.js files into the project folder
	C. Install dev dependencies, enter from your command line (pulled from package.json) < npm install >
	D. You're going to need to create the file structure (listed below) if you didn't download this from Github

3. Starting Development Enviroment (what you actually wanted to read)
	A. For "deving" out and file changes, enter from your command line < gulp start >
		I. This will open a new window
	B. When your ready for files to be compiled for production < gulp default >

4. File Structure 
	A. If you didn't install/download this from GitHub you can just create the directory structure here
	B. Unless there is a .js, .scss, or .json it just means each item is a folder
	C. This is just to get the enviroment to work with the gulpfile.js from the installation

Project_Folder
|_
	assets
		|_css
		|_fonts
		|_images
		|_js
			|_main.js
		|_scss
			|_styles.scss
	index.html
	gulpfile.js
	package.json

5. Accessing HTML Pages
	A. Browser-Sync is set to localhost: 3000 and will display the index.html when < gulp start > completes
	B. To access other pages simply put HTML files into the project directory, then in your browser type the name of the file or file path after localhost: 3000
		*Example: http://localhost:3000/example.html, http://localhost:3000/file-path/test.html