window.trackClick = async function(id){

const tool = allTools.find(t => t.id === id);

if(!tool) return;

const newClicks = (tool.clicks || 0) + 1;

await supabase
.from("tools")
.update({
clicks:newClicks,
trending_score:newClicks
})
.eq("id",id);

}
