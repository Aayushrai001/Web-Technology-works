<!DOCTYPE html>
<html lang="en">
<head>
<style>
  body {
    background-image:url('AayushRai_2329780_Background2.jpg');;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
</head>
<body><?php
if (isset($_GET['submit'])) {
  $city = $_GET['city'];
} else {
  $city = "Auburn";
}


$url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q={$city}&appid=f0fcf241e38854707ee5bffd36e3dc8b&units=metric";     

// Make API request and parse JSON response
$response = file_get_contents($url);
$data = json_decode($response, true);

if (!$data) {
  // Handle API error
  die("Error: Failed to retrieve data from OpenWeatherMap API.");
}

// Extract relevant weather data
$city_name = $data['name'];
$condition = $data['weather'][0]['main'];
$icon = $data['weather'][0]['icon'];
$temperature = $data['main']['temp'];
$pressure = $data['main']['pressure'];
$humidity = $data['main']['humidity'];
$wind_speed = $data['wind']['speed'];
$wind_direction = $data['wind']['deg'];
$cloudiness = $data['clouds']['all'];
$sunrise = date('Y-m-d H:i:s', $data['sys']['sunrise']);
$sunset = date('Y-m-d H:i:s', $data['sys']['sunset']);
$rainfall = isset($data['rain']['1h']) ? $data['rain']['1h'] : 'not given';


// Insert or update weather data in database
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'weather_data';

$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Check if data for the current hour is already present in database
$sql = "SELECT * FROM weather WHERE `city`='$city_name' AND DATE(`date`) = CURDATE()";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
	// Update existing row with latest weather data
	$sql = "UPDATE weather SET `condition`='$condition', `icon`='$icon', `temperature`='$temperature', `pressure`='$pressure', `rainfall`=0, `humidity`='$humidity', `wind_speed`='$wind_speed' WHERE `city`='$city_name' AND `date`= DATE_FORMAT(NOW(), '%Y-%m-%d %H:00:00')";

  } else {
	// Insert new row with current weather data
	$sql = "INSERT INTO weather (`city`, `date`, `condition`, `icon`, `temperature`, `pressure`, `rainfall`, `wind_speed`, `humidity`)
		  VALUES ('$city_name', NOW(), '$condition', '$icon', '$temperature', '$pressure', '0', '$wind_speed', '$humidity')";
  }
mysqli_query($conn, $sql);

// Retrieve latest weather data from database
$sql = "SELECT * FROM weather WHERE `city`='$city_name' ORDER BY `date` DESC LIMIT 7";
$result = mysqli_query($conn, $sql);

echo "<h1>Weather in {$city_name} (last 7 records)</h1>";
echo "<table border='1'>";
while ($row = mysqli_fetch_assoc($result)) {
$date = date('Y-m-d H:i:s', strtotime($row['date']));
$condition = $row['condition'];
$icon = $row['icon'];
$temperature = $row['temperature'];
$humidity = $row['humidity'];
$wind_speed = $row['wind_speed'];

echo "<tr>";
echo "<th>City</th>";
echo "<td>{$city_name}</td>";
echo "<th>Date</th>";
echo "<td>{$date}</td>";
echo "<th>Condition</th>";
echo "<td>{$condition}</td>";
echo "<th>Weather Icon</th>";
echo "<td><img src='http://openweathermap.org/img/w/{$icon}.png'></td>";
echo "<th>Temperature</th>";
echo "<td>{$temperature}°C</td>";
echo "<th>Humidity</th>";
echo "<td>{$humidity}%</td>";
echo "<th>Wind Speed</th>";
echo "<td>{$wind_speed} m/s</td>";
echo "<th>Pressure</th>";
echo "<td>{$pressure} hPa</td>";
echo "</tr>";
}
echo "</table>";

// Close database connection
mysqli_close($conn);
?>
</body>
</html>