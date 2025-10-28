# Zwift(-Power) Analyzer Chrome Extension

A powerful Chrome extension that enhances Zwift(-Power) with advanced data visualization and analysis capabilities for Zwift cycling events.

## Features

### 📊 Event Analysis
- **Power Scatter Plots**: Visualize rider power data across different time durations (20min, 5min, 1min, 15sec)
- **Category Distribution Charts**: See rider distribution across categories (A+, A, B, C, D) for mixed and women's divisions
- **Interactive Race Charts**: Analyze power, speed, and altitude data during races
- **Team Comparison**: Compare performance within teams and across categories

### 🏁 Race Visualization
- **Real-time Power Analysis**: View power output (watts and w/kg) with smoothing options
- **Speed Tracking**: Monitor speed variations throughout races
- **Altitude Profiles**: Analyze elevation changes during events
- **Multi-rider Comparison**: Compare up to 10 riders simultaneously with color-coded charts

### 🏆 League Support
- **League Standings**: Enhanced league view with detailed rider analysis
- **Historical Performance**: Access rider's best performances from league events
- **Cross-event Comparison**: Compare riders across different league events

### Team & Profile Enhancement
- **Team Pages**: Enhanced team analysis and member performance visualization on ZwiftPower
- **Profile Pages**: Advanced rider profile analytics with detailed performance history
- **Member Comparison**: Compare team members' performances and progress over time

### 🚴 Zwift.com Activity Enhancement
- **Activity Analysis**: Enhanced charts and data visualization on Zwift.com activity pages
- **Performance Metrics**: Additional insights and analytics for individual activities including heart rate data
- **Data Integration**: Seamless integration with Zwift's native activity data

### 🔧 Interactive Controls
- **Duration Selection**: Switch between different power duration analyses
- **Axis Options**: Toggle between time-based and distance-based charts
- **Power Units**: Switch between watts and watts per kilogram
- **Smoothing Options**: Apply or remove power smoothing for cleaner data visualization

## Installation

### From Chrome Web Store
*(Not yet published)*

### Manual Installation packaged

1. Download the release 
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Drag the zip file into the chrome extensions tab 


## Usage

### ZwiftPower Event Pages
1. Navigate to any ZwiftPower event page
2. The extension automatically injects analysis charts at the top of the page
3. Use the dropdown controls to:
   - Change power duration analysis (20min, 5min, 1min, 15sec)
   - Switch between scatter plot categories
4. Click the report icon (📄) next to any rider to add them to the race analysis charts

### ZwiftPower League Pages
1. Navigate to any ZwiftPower league page
2. Enhanced charts and controls are automatically added
3. Click rider report icons to analyze their best league performances
4. Compare multiple riders' race data side by side

### Zwift.com Activity Pages
1. Navigate to any Zwift.com activity page (zwift.com/activity/...)
2. The extension automatically enhances the page with additional charts and analysis
3. View enhanced performance metrics and data visualizations
4. Access detailed analytics beyond the standard Zwift activity data

### ZwiftPower Team & Profile Pages
1. Navigate to any ZwiftPower team page or profile page
2. Enhanced analytics and visualizations are automatically added
3. View detailed team member comparisons and performance trends
4. Access advanced profile analytics with historical data

### Chart Controls
- **Zoom**: Use mouse wheel or zoom tools to focus on specific data ranges
- **Pan**: Click and drag to move around zoomed charts
- **Legend**: Click legend items to show/hide specific riders
- **Export**: Use the save icon to export charts as images

## Privacy & Data

This extension prioritizes user privacy with context-aware data display:

### ZwiftPower Pages (Events & Leagues)
- ✅ **Power data**: Displayed (public performance metrics)
- ✅ **Speed data**: Displayed (public performance metrics)  
- ✅ **Altitude data**: Displayed (public performance metrics)
- ❌ **Heart rate data**: **NOT displayed** (private health data)
- ❌ **HR/power ratios**: **NOT displayed** (private health data)

### Zwift.com Activity Pages
- ✅ **Power data**: Displayed (public performance metrics)
- ✅ **Speed data**: Displayed (public performance metrics)
- ✅ **Altitude data**: Displayed (public performance metrics)
- ✅ **Heart rate data**: **Displayed** (already visible on Zwift activity pages)
- ✅ **HR distribution**: **Displayed** (enhanced stats of already visible data)

The extension only processes publicly available data from ZwiftPower and does not collect or transmit any personal information.

## Technical Details

### Built With
- **ECharts**: Advanced charting library for interactive visualizations
- **JavaScript ES6+**: Modern JavaScript with module imports
- **Chrome Extension Manifest V2**: Standard Chrome extension framework

### File Structure
```
src/
├── manifest.json          # Extension configuration
├── background.js          # Background script
├── common.js             # Shared utilities and data fetching
├── event.js              # Event page enhancement
├── event_inject.js       # Event page content injection
├── league.js             # League page enhancement
├── popup.html/css        # Extension popup interface
├── activity.js           # Activity page features (Zwift.com)
├── activity_inject.js    # Activity page content injection
├── profile.js            # Profile page features (ZwiftPower)
├── profile_inject.js     # Profile page content injection
├── team.js              # Team page features (ZwiftPower)
├── team_inject.js        # Team page content injection
└── images/              # Extension icons and assets
```

### Data Sources
- ZwiftPower public API endpoints
- Zwift.com activity data and metrics
- Publicly available rider performance data
- Event results and standings

## Development

### Prerequisites
- PowerShell (for build scripts)
- Chrome browser
- Text editor or IDE

### Build Scripts
- `build.ps1`: Full build with optimization
- `build-dev.ps1`: Development build
- `build-simple.ps1`: Simple build without minification
- `package.ps1`: Create distribution package
- `validate-package.ps1`: Validate extension package

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on different ZwiftPower pages
5. Submit a pull request

## Browser Compatibility

- ✅ Chrome 80+
- ✅ Chromium-based browsers (Edge, Brave, etc.)
- ❌ Firefox (different extension architecture)
- ❌ Safari (different extension architecture)

## Troubleshooting

### Charts Not Loading
- Ensure you're on a supported page (ZwiftPower event/league/team/profile or Zwift.com activity page)
- Check that the page has fully loaded
- Refresh the page if charts don't appear

### Data Not Showing
- Verify the event has public data available
- Some private events may not have accessible fit file data
- Check browser console for any error messages

### Performance Issues
- Limit the number of riders in race analysis (max 10 recommended)
- Use power smoothing for better performance with large datasets
- Close other browser tabs if memory usage is high

## Version History

### Current Version
- Enhanced privacy: Removed all heart rate data display
- Improved performance analysis charts
- Better error handling for private events
- Streamlined user interface

## License

This project is open source. Please respect ZwiftPower's terms of service when using this extension.

## Support

For issues, feature requests, or questions:
- Check the troubleshooting section above
- Review existing issues in the repository
- Create a new issue with detailed information about your problem

---

**Note**: This extension is not officially affiliated with Zwift or ZwiftPower. It's a community-created tool to enhance the analysis experience for Zwift cyclists.
