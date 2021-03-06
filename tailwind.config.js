module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'new_tournament_page': "url('/Assets/background-img/new_tournament_page.jpg')",
        'select_tournament_page': "url('/Assets/background-img/select_tournament_page.jpg')",
        'table_fixture_page': "url('/Assets/background-img/table_fixture_page.jpg')"
      },
      colors: {
        'Content_box_background': '#D6DCF1',
        'primary_dark_blue': '#061246',
        'active_button_blue': '#D6DCF1',
        'input_background': '#D6DCF1',
        'tournament_card_imgs_bg': '#D6DCF1',
        'inactive_button_color': '#CDD3EB',
        'save_button_color_border_color': '#ACB3CD',
      }
    },
  },
  plugins: [],
}
