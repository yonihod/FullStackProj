import PostsService from "../services/Posts";
import UsersService from "../services/Users";

export default class ChartsService {
    static getMostPopularPosts() {
        return PostsService.getPosts().then(res => {
            // get only posts with tags
            const d = res.filter(p => p.hasOwnProperty('tags') && p.tags.length > 0);

            // create object with all the tags and their count
            const tagsWithCount = d.flatMap(p => p.tags).reduce((a, c) =>
            (a[c] = (a[c] || 0) + 1, a), Object.create(null));
            
            // map the object to array
            var array = Object.keys(tagsWithCount).map(function (key) {
                return [(key), tagsWithCount[key]];
            });

            // sort and take first 10
            const sorted = array.sort((x, y) => y[1] - x[1]).slice(0, 10)

            // map to match the chart data template
            const mapped = sorted.map(function (x) {
                return {
                    x: x[0],
                    y: x[1]
                };
            });
            
            // final data
            const data = {
                key: 'Most Common Posts Tags', values: mapped
            };

            return data;
        }).catch(err => {
            console.log(err)
        });
    }

    static getUsersSkills() {
        UsersService.getUsers().then(res => {
            const usersWithSkills = res.filter(p => p.hasOwnProperty('skills') && p.skills.length > 0);
            const tagsWithCount = usersWithSkills.flatMap(p => p.skills).reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
            var array = Object.keys(tagsWithCount).map(function (key) {
                return [(key), tagsWithCount[key]];
            });
            const sorted = array.sort((x, y) => y[1] - x[1]).slice(0, 10)

            // map to match the chart data template
            const mapped = sorted.map(function (x) {
                return {
                    x: x[0],
                    y: x[1]
                };
            });
            
            // final data
            const data = {
                key: 'Users Skills', values: mapped
            };

        }).catch(err => {
            console.log(err)
        });
    }
}