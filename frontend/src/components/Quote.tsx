export const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex flex-col items-start justify-start max-w-2xl mx-auto px-4">
        <div className="max-w-xl font-bold text-3xl text-start">
          "The customer support I recieved was exceptional. The support team
          went above and beyond to address my concerns."
        </div>
        <div className="mt-4 text-xl font-semibold">Jules Winnfield</div>
        <div className="text-sm text-slate-400 font-semibold">
          CEO | Acme Inc
        </div>
      </div>
    </div>
  );
};

// Sure! Here’s how you can achieve a similar look step by step:

// 1. **Analyze the Layout**: Notice the quote is centered on the page, with text aligned to the left. There’s a large quote, followed by the author’s name in bold, and their title in lighter text.

// 2. **Structure the Content**: Replace your placeholder text with the actual quote, author name, and title. Use appropriate HTML tags (`<blockquote>`, `<p>`, `<span>`, etc.).

// 3. **Typography**: Use larger font size and bold weight for the quote. Make the author’s name bold and slightly larger than the title, which should be lighter and smaller.

// 4. **Spacing**: Add margin or padding between the quote, author name, and title for separation.

// 5. **Alignment**: Align the text to the left, not center. Use Tailwind classes like `text-left`.

// 6. **Background and Container**: Use a subtle background color (like `bg-gray-50`) and ensure the container doesn’t take the full screen height unless needed.

// 7. **Responsiveness**: Make sure the text scales well on different screen sizes using responsive Tailwind classes.

// 8. **Final Touches**: Adjust colors, font sizes, and spacing until it closely matches the reference image.

// By following these steps, you’ll recreate the look in your React component using Tailwind CSS.
