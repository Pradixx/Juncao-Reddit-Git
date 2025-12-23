export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner mt-10">
      <div className="max-w-7xl mx-auto p-4 text-center text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} IdeaHub. All rights reserved.
      </div>
    </footer>
  );
}
