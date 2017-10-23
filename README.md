## The Essential Mix API

This is a serverless implementaton of a REST API pulling data from an Algolia hosted index of all the Essential Mixes that have ever been broadcast on BBC Radio 1 since it first started broascasting weekly in 1993. At last count there are some 1315 mixes available here.

The service is currently hosted on AWS Lamba, so it's extremely cheap to run and probably means you won't kill it by hitting it hard with requests.

Currently, no auth is required to use the API. However, this is an alpha implementation in dev mode and it's likely, for tracking purposed only, that auth will be required in future.

### Get all the mixes

```
GET https://cxqxc7ixtj.execute-api.us-east-1.amazonaws.com/dev/api
```

Returns a JSON object of all the mixes ever broadcast and all their attributes. It's pretty hefty. Each one follows this pattern:

```
{
  mix_by: "Purple Disco Machine",
  broadcast_date: "2017-10-21T00:00:00.000Z",
  year: 2017,
  mixesdb_url: "/w/2017-10-21_-_Purple_Disco_Machine_-_Essential_Mix",
  hotness: "3",
  has_audio: true,
  image: {
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnWLb1bW-m_NLsr9bssYGm3tSN46AhekPhRkb1LZQURMo8_amY1m0xaQvM"
  },
  audio_player: [
    "/corenewsuploads/purple-disco-machine-essential-mix-2017-10-21/"
  ],
  tracklist: [
    "<li> [000] D&#x2010;Train - Music</li>..."
  ],
  objectID: "1091490"
}
```

### Get a single mix

For this you'll need to use the `objectID` param from the main list above. As follows:

```
GET https://cxqxc7ixtj.execute-api.us-east-1.amazonaws.com/dev/api/:id
```

A real world example of this would be:

```
GET https://cxqxc7ixtj.execute-api.us-east-1.amazonaws.com/dev/api/1091490
```

Returns the JSON object for a single mix from the index, plus all its attributes

### Add a new mix

To add a new mix, you'll first need to build an object that represents the same attributes as above.

```
POST https://cxqxc7ixtj.execute-api.us-east-1.amazonaws.com/dev/api/
```

The minimum you need to POST here would be:

```
{
  mix_by: "",
  broadcast_date: "2017-10-21T00:00:00.000Z"
}
```
