import React from 'react';

export default class TitleBar extends React.Component {
  getStyles = () => ({
    navbar: {
      width: '100%',
      backgroundColor: '#212121',
      color: 'white',
      padding: '5px',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '99999999'
    }
  });

  render() {
    const styles = this.getStyles();
    return (
      <nav style={styles.navbar}>
        <h2>Violent Crime</h2>
      </nav>
    )
  }
}
