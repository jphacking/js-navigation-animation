// Ensure the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve essential DOM elements
  const menuBars = document.getElementById("menu-bars");
  const overlay = document.getElementById("overlay");
  const navItems = [
    document.getElementById("nav-1"),
    document.getElementById("nav-2"),
    document.getElementById("nav-3"),
    document.getElementById("nav-4"),
    document.getElementById("nav-5"),
  ];

  // Verify that all necessary elements exist to avoid errors
  if (!menuBars || !overlay || navItems.includes(null)) {
    console.error("Navigation elements not found in the DOM.");
    return;
  }

  /**
   * Animate navigation items by replacing their CSS classes.
   * This function triggers slide animations for the nav items.
   *
   * @param {string} directionFrom - The current animation state ("in" or "out").
   * @param {string} directionTo - The target animation state ("in" or "out").
   */
  function animateNavItems(directionFrom, directionTo) {
    navItems.forEach((navItem, index) => {
      // Build class names based on the order (1-indexed)
      const currentClass = `slide-${directionFrom}-${index + 1}`;
      const newClass = `slide-${directionTo}-${index + 1}`;

      // Replace the existing animation class with the new one if it exists
      if (navItem.classList.contains(currentClass)) {
        navItem.classList.replace(currentClass, newClass);
      } else {
        // If the expected class is not present, add the new class directly
        navItem.classList.add(newClass);
      }
    });
  }

  /**
   * Toggle the navigation overlay and associated animations.
   * Also updates ARIA attributes for accessibility.
   */
  function toggleNavigation() {
    // Toggle the menu button's active state (changes hamburger to "X")
    menuBars.classList.toggle("change");

    // Toggle the overlay visibility
    overlay.classList.toggle("overlay-active");

    // Update accessibility attributes based on the new state
    const isActive = overlay.classList.contains("overlay-active");
    menuBars.setAttribute("aria-expanded", isActive);
    overlay.setAttribute("aria-hidden", !isActive);

    if (isActive) {
      // When activating, slide the overlay in from the right and animate nav items in
      overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
      animateNavItems("out", "in");
    } else {
      // When deactivating, slide the overlay out to the left and animate nav items out
      overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
      animateNavItems("in", "out");
    }
  }

  // Event listener for the menu toggle button
  menuBars.addEventListener("click", toggleNavigation);

  // Add event listeners to each navigation item to close the menu upon selection
  navItems.forEach((navItem) => {
    navItem.addEventListener("click", toggleNavigation);
  });
});
