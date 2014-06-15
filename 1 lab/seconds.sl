surface
seconds(
	float	Width = 0.10,				// square width
		Ks = 0.4,				// specular coefficient
		Kd = 0.5, 				// diffuse  coefficient
		Ka = 0.1, 				// ambient  coefficient
		Roughness = 0.1;			// specular roughness
	color	SpecularColor = color( 1, 1, 1 )	// specular color
)
{
	color ORANGE = color( 1., .5, 0. );

	varying vector Nf = faceforward( normalize( N ), I );
	vector V = normalize( -I );

	float up = 2. * u;
	float vp = v;
	float numinu = floor( up / Width );
	float numinv = floor( vp / Width );
	
	Oi = Os;	// use whatever opacity the rib file gave us
	
        color TheColor = Cs;
	if( mod( numinu+numinv, 2. ) == 0 )
		TheColor = ORANGE;

	Ci =        TheColor * Ka * ambient();
	Ci = Ci  +  TheColor * Kd * diffuse(Nf);
	Ci = Ci  +  SpecularColor * Ks * specular( Nf, V, Roughness );
}

