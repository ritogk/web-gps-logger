window.onload = (event) => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error, options)
  } else {
    console.log("Geolocation is not supported by this browser.")
  }

  const downloadElement = document.getElementById(
    "download"
  ) as HTMLButtonElement
  const recordElement = document.getElementById("record") as HTMLButtonElement
  recordElement.addEventListener("click", record)
  downloadElement.addEventListener("click", download)
}

const success = (position: any) => {
  var latitude = position.coords.latitude
  var longitude = position.coords.longitude

  const latitudeElement = <HTMLSpanElement>document.getElementById("latitude")
  latitudeElement.innerText = latitude
  const longitudeElement = <HTMLSpanElement>document.getElementById("longitude")
  longitudeElement.innerText = longitude
  if (isRecorded) {
    locationLog.push(`${latitude},${longitude}`)
  }
}

const error = (err: any) => {
  console.warn("ERROR(" + err.code + "): " + err.message)
}

var options = {
  enableHighAccuracy: true, // 高精度な位置情報を要求する
  timeout: 1200, // 位置情報の取得に最大5秒まで待つ
  maximumAge: 0, // 常に最新の位置情報を取得する
}

var locationLog: string[] = []
var isRecorded = false

const record = () => {
  locationLog = []
  isRecorded = true
}
const download = () => {
  const text = JSON.stringify(locationLog)
  const fileName = "test.txt"
  const blob = new Blob([text], { type: "text/plain" })
  const aTag = document.createElement("a")
  aTag.href = URL.createObjectURL(blob)
  aTag.target = "_blank"
  aTag.download = fileName
  aTag.click()
  URL.revokeObjectURL(aTag.href)
  locationLog = []
  isRecorded = false
}
